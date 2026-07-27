import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageWrapper = styled.div`
  padding-top: 90px;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

const AuthContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  max-width: 960px;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.xl};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 520px;
    flex-direction: column;
    margin: 0 1rem;
  }
`;

const BrandPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.primaryDark} 100%);
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 520px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -40%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(216,195,165,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -30%;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
    border-radius: 50%;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const BrandName = styled.h2`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.hero};
  color: ${props => props.theme.colors.white};
  font-weight: 400;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
`;

const BrandTagline = styled.p`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.champagne};
  font-style: italic;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const BrandDivider = styled.div`
  width: 50px;
  height: 2px;
  background: ${props => props.theme.colors.champagne};
  margin: 0 auto 1.5rem;
  opacity: 0.5;
  position: relative;
  z-index: 1;
`;

const BrandDesc = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  max-width: 280px;
  position: relative;
  z-index: 1;
`;

const FormPanel = styled.div`
  flex: 1;
  padding: 2.5rem;
  min-height: 520px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 2rem 1.5rem;
    min-height: auto;
  }
`;

const TabRow = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TabBtn = styled.button`
  flex: 1;
  padding: 0.75rem 0;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.textMuted};
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;
  background: none;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FormTitle = styled.h3`
  font-family: ${props => props.theme.fonts.serif};
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid ${props => props.$error ? props.theme.colors.error : props.theme.colors.border};
  background: ${props => props.theme.colors.cream};
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(31, 58, 50, 0.08);
    background: ${props => props.theme.colors.white};
  }
`;

const ErrorText = styled.span`
  display: block;
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.error};
  margin-top: 0.35rem;
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  margin-bottom: 1.25rem;
  user-select: none;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`;

const ForgotLink = styled(Link)`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.cocoa};
  margin-left: auto;
  display: inline;

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const AccountTypeRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const AccountTypeBtn = styled.button`
  flex: 1;
  padding: 0.7rem;
  border: 1.5px solid ${props => props.$active ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.$active ? props.theme.colors.cream : 'transparent'};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.textLight};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SwitchText = styled.p`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-top: 1.5rem;
`;

const SwitchLink = styled.button`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.cocoa};
  font-weight: 600;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const tabVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

export default function AuthPages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [registerForm, setRegisterForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    accountType: 'traveler', terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginForm.email) newErrors.email = 'Email is required';
    if (!loginForm.password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerForm.name) newErrors.name = 'Full name is required';
    if (!registerForm.email) newErrors.email = 'Email is required';
    if (!registerForm.password) newErrors.password = 'Password is required';
    else if (registerForm.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (registerForm.password !== registerForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!registerForm.terms) newErrors.terms = 'You must agree to the terms';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    navigate('/');
  };

  return (
    <PageWrapper>
      <AuthContainer
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <BrandPanel>
          <BrandName>VicFalls One</BrandName>
          <BrandTagline>"Scenes so beautiful they must have been gazed upon by angels in flight."</BrandTagline>
          <BrandDivider />
          <BrandDesc>
            Your curated gateway to Victoria Falls. Discover extraordinary experiences, handpicked stays, and bespoke travel planning.
          </BrandDesc>
        </BrandPanel>

        <FormPanel>
          <TabRow>
            <TabBtn $active={activeTab === 'login'} onClick={() => { setActiveTab('login'); setErrors({}); }}>
              Sign In
            </TabBtn>
            <TabBtn $active={activeTab === 'register'} onClick={() => { setActiveTab('register'); setErrors({}); }}>
              Create Account
            </TabBtn>
          </TabRow>

          {activeTab === 'login' ? (
            <motion.form key="login" variants={tabVariants} initial="hidden" animate="visible" onSubmit={handleLogin}>
              <FormTitle>Welcome Back</FormTitle>

              <InputGroup>
                <Label>Email Address</Label>
                <Input
                  $error={errors.email}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </InputGroup>

              <InputGroup>
                <InputHeader>
                  <Label>Password</Label>
                  <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
                </InputHeader>
                <Input
                  $error={errors.password}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </InputGroup>

              <CheckboxRow>
                <input
                  type="checkbox"
                  name="remember"
                  checked={loginForm.remember}
                  onChange={handleLoginChange}
                />
                Remember me
              </CheckboxRow>

              <SubmitBtn type="submit">Sign In</SubmitBtn>

              <SwitchText>
                Don't have an account?{' '}
                <SwitchLink onClick={() => { setActiveTab('register'); setErrors({}); }}>
                  Sign Up
                </SwitchLink>
              </SwitchText>
            </motion.form>
          ) : (
            <motion.form key="register" variants={tabVariants} initial="hidden" animate="visible" onSubmit={handleRegister}>
              <FormTitle>Get Started</FormTitle>

              <InputGroup>
                <Label>Full Name</Label>
                <Input
                  $error={errors.name}
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </InputGroup>

              <InputGroup>
                <Label>Email Address</Label>
                <Input
                  $error={errors.email}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input
                  $error={errors.password}
                  type="password"
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
                {errors.password && <ErrorText>{errors.password}</ErrorText>}
              </InputGroup>

              <InputGroup>
                <Label>Confirm Password</Label>
                <Input
                  $error={errors.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                />
                {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
              </InputGroup>

              <Label>Account Type</Label>
              <AccountTypeRow>
                <AccountTypeBtn
                  type="button"
                  $active={registerForm.accountType === 'traveler'}
                  onClick={() => setRegisterForm(prev => ({ ...prev, accountType: 'traveler' }))}
                >
                  Traveler
                </AccountTypeBtn>
                <AccountTypeBtn
                  type="button"
                  $active={registerForm.accountType === 'business'}
                  onClick={() => setRegisterForm(prev => ({ ...prev, accountType: 'business' }))}
                >
                  Business
                </AccountTypeBtn>
              </AccountTypeRow>

              <CheckboxRow>
                <input
                  type="checkbox"
                  name="terms"
                  checked={registerForm.terms}
                  onChange={handleRegisterChange}
                />
                I agree to the Terms of Service
              </CheckboxRow>
              {errors.terms && <ErrorText style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}>{errors.terms}</ErrorText>}

              <SubmitBtn type="submit">Create Account</SubmitBtn>

              <SwitchText>
                Already have an account?{' '}
                <SwitchLink onClick={() => { setActiveTab('login'); setErrors({}); }}>
                  Sign In
                </SwitchLink>
              </SwitchText>
            </motion.form>
          )}
        </FormPanel>
      </AuthContainer>
    </PageWrapper>
  );
}
