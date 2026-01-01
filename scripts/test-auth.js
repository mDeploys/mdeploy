
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        env[key] = value;
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
    const email = `test_${Date.now()}@example.com`;
    const password = 'TestPassword123!';

    console.log(`\n1. Testing Sign Up with ${email}...`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: 'Test User' } } // Trigger the profile creation
    });

    if (signUpError) {
        console.error('❌ Sign Up Failed:', signUpError.status, signUpError.message);
        if (signUpError.status === 500) {
            console.error('   -> This confirms the error is in the INSERT trigger on auth.users (create_profile_on_signup)');
        }
    } else {
        console.log('✅ Sign Up Successful:', signUpData.user?.id);
    }

    console.log('\n2. Testing Sign In...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInError) {
        console.error('❌ Sign In Failed:', signInError.status, signInError.message);
        if (signInError.status === 500) {
            console.error('   -> This suggests an error during UPDATE of auth.users (e.g. last_sign_in_at) or a SELECT policy issue.');
        }
    } else {
        console.log('✅ Sign In Successful');
    }
}

testAuth();
