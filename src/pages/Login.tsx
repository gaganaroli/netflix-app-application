import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError(null);
            await login(data.email, data.password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-netflix-hero bg-cover bg-center flex flex-col">
            <header className="p-8">
                <div className="text-netflix-red flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <Play fill="currentColor" size={32} />
                    <span className="text-3xl font-black tracking-tighter uppercase italic">MyFlix</span>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="card-netflix">
                    <h1 className="text-3xl font-bold mb-8">Sign In</h1>

                    {error && (
                        <div className="bg-orange-600 text-white p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="Email"
                                className={`input-netflix ${errors.email ? 'border-b-2 border-orange-500' : ''}`}
                            />
                            {errors.email && (
                                <p className="text-orange-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="Password"
                                className={`input-netflix ${errors.password ? 'border-b-2 border-orange-500' : ''}`}
                            />
                            {errors.password && (
                                <p className="text-orange-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className="btn-netflix w-full mt-4"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="w-4 h-4 rounded bg-gray-500 border-none" />
                            <label htmlFor="remember" className="text-gray-400 text-sm ml-2">Remember me</label>
                        </div>
                        <Link to="#" className="text-gray-400 text-sm hover:underline">Need help?</Link>
                    </div>

                    <p className="text-gray-500 mt-12">
                        New to MyFlix?{' '}
                        <Link to="/signup" className="text-white hover:underline font-semibold">
                            Sign up now
                        </Link>
                    </p>

                    <p className="text-gray-500 text-xs mt-4">
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <button className="text-blue-600 hover:underline">Learn more.</button>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;
