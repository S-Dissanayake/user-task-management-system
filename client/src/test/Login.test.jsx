// Login.test.js
import { test, vi } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react"

import Login from '../pages/login/Login';

test('renders login form correctly', () => {
    render(<Login />);
    
    // Check if form elements are rendered
    expect(screen.getByLabelText('Email address')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();
});

test('switches to signup form when "Join here" is clicked', () => {
    render(<Login />);
    
    // Click the "Join here" button
    fireEvent.click(screen.getByText('Join here'));
    
    // Check if form elements for signup are rendered
    expect(screen.getByLabelText('User name')).toBeTruthy();
    expect(screen.getByLabelText('Email address')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeTruthy();
});

test('calls loginSubmit function when "Login" button is clicked', () => {
    const loginSubmitMock = vi.fn();
    render(<Login />);
    
    // Mock the loginSubmit function
    global.loginSubmit = loginSubmitMock;
    
    // Simulate user input
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'tester@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Test/789' } });
    
    // Click the "Login" button
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    // Check if loginSubmit function is called with correct data
    expect(loginSubmitMock).toHaveBeenCalled({
        email: 'tester@gmail.com',
        password: 'Test/789'
    });
});
