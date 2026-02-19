import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play } from 'lucide-react';

const signupSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            setError(null);
            await signup({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            });
            navigate('/login');
        } catch (err) {
            setError('Something went wrong. Please try again.');
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
                    <h1 className="text-3xl font-bold mb-8">Sign Up</h1>

                    {error && (
                        <div className="bg-orange-600 text-white p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                                {...register('fullName')}
                                type="text"
                                placeholder="Full Name"
                                className={`input-netflix ${errors.fullName ? 'border-b-2 border-orange-500' : ''}`}
                            />
                            {errors.fullName && (
                                <p className="text-orange-500 text-xs mt-1">{errors.fullName.message}</p>
                            )}
                        </div>

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

                        <div>
                            <input
                                {...register('confirmPassword')}
                                type="password"
                                placeholder="Confirm Password"
                                className={`input-netflix ${errors.confirmPassword ? 'border-b-2 border-orange-500' : ''}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-orange-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            className="btn-netflix w-full mt-4"
                        >
                            {isSubmitting ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-gray-400 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-white hover:underline font-semibold">
                            Sign in now
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Signup;
