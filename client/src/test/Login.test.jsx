import { test, vi } from 'vitest';
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react"

import Login from '../pages/login/Login';

test('renders login form correctly', () => {
    render(
        <BrowserRouter>   
            <Login />
        </BrowserRouter>
    );
    
    // Check if form elements are rendered
    expect(screen.getByLabelText('Email address')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();
});

test('switches to signup form when "Join here" is clicked', () => {
    render(
        <BrowserRouter>   
            <Login />
        </BrowserRouter>
    );
    
    // Click the "Join here" button
    fireEvent.click(screen.getByText('Join here'));
    
    // Check if form elements for signup are rendered
    expect(screen.getByLabelText('User name')).toBeTruthy();
    expect(screen.getByLabelText('Email address')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeTruthy();
});

  