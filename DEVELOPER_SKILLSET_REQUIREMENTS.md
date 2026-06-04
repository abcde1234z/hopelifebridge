# Developer Skillset Requirements for HopeLIFE Bridge

## Project Overview
HopeLIFE Bridge is a full-stack healthcare and financial services application that helps users manage healthcare expenses, find emergency services, and track their medical wallet across multiple insurance plans.

---

## Core Skill Requirements

### 1. **Frontend Development** (40% of work)

#### Required Skills:
- **React 19+**
  - Functional components
  - Hooks (useState, useEffect, useContext, useCallback, useMemo)
  - Server Components (React Server Components - RSC)
  - Suspense boundaries
  - Error boundaries

- **Next.js 16**
  - App Router (not Pages Router)
  - Server Actions
  - API Routes
  - Dynamic routing and nested routes
  - Middleware/Proxy configuration
  - Image optimization
  - Deployment on Vercel

- **TypeScript**
  - Strict mode enabled
  - Type inference
  - Interfaces and types for components
  - Utility types

- **Tailwind CSS 4**
  - Responsive design (mobile-first approach)
  - Component styling
  - Design tokens/CSS variables
  - Layout systems (flexbox, grid)

- **State Management**
  - Client-side state with hooks
  - Server-side data fetching
  - SWR or similar libraries for client data fetching
  - Form state management

- **UI/UX Implementation**
  - Accessibility (WCAG 2.1 AA)
  - Semantic HTML
  - ARIA attributes
  - Screen reader testing

#### Nice-to-Have:
- shadcn/ui component library
- Framer Motion for animations
- Chart libraries (Recharts)
- Responsive design testing

---

### 2. **Backend Development** (35% of work)

#### Required Skills:
- **Node.js / Express (via Next.js API Routes)**
  - API endpoint design
  - Request/response handling
  - Error handling and logging
  - CORS configuration

- **Database Design & SQL**
  - Relational database architecture
  - Schema design
  - Normalization
  - Query optimization
  - Transactions and data consistency

- **Supabase / PostgreSQL**
  - Supabase project setup
  - PostgreSQL schema creation
  - Row Level Security (RLS) policies
  - Database migrations
  - Real-time subscriptions (optional)
  - Auth integration

- **Authentication & Authorization**
  - Supabase Auth setup
  - JWT tokens
  - Session management
  - Protected routes
  - Permission/role-based access control

- **API Development**
  - RESTful API design
  - Request validation
  - Error handling and status codes
  - Rate limiting
  - Data serialization (JSON)

- **Environment Variables & Secrets**
  - .env file management
  - Secure credential storage
  - Different environments (dev, staging, prod)

#### Nice-to-Have:
- GraphQL (if upgrading from REST)
- Webhooks (Stripe, Twilio callbacks)
- Caching strategies
- Database performance optimization

---

### 3. **Integration & Third-Party Services** (15% of work)

#### Required Skills:
- **Payment Processing**
  - Stripe API integration
  - Payment webhooks
  - Subscription management
  - PCI compliance understanding

- **SMS/Communication**
  - Twilio SMS integration
  - SendGrid email integration
  - Message templates

- **Geolocation & Maps**
  - Google Maps API
  - Location-based queries
  - Distance calculations

- **File Storage**
  - Vercel Blob or AWS S3
  - Image uploads
  - File management

#### Nice-to-Have:
- Push notifications (Firebase Cloud Messaging)
- Video conferencing (Agora, Twilio)
- Document processing (OCR)

---

### 4. **DevOps & Deployment** (10% of work)

#### Required Skills:
- **Version Control**
  - Git fundamentals
  - GitHub workflow
  - Branch management
  - Pull requests and code review

- **Deployment**
  - Vercel deployment process
  - Environment setup on Vercel
  - Continuous integration/deployment (CI/CD)
  - Monitoring and logs

- **Database Migrations**
  - Migration tools
  - Data consistency during updates
  - Rollback strategies

#### Nice-to-Have:
- Docker containerization
- Staging environments
- Health checks and monitoring
- Error tracking (Sentry)

---

## Experience Level Requirements

### **Senior Full-Stack Developer** (Recommended)
- **Years of Experience:** 5+ years
- **Salary Range:** $80K - $150K+ annually
- **Capabilities:**
  - Can build the entire application independently
  - Can architect database and API design
  - Can handle edge cases and security
  - Can mentor junior developers
  - Can optimize performance
  - Can manage technical debt

### **Mid-Level Full-Stack Developer**
- **Years of Experience:** 3-5 years
- **Salary Range:** $60K - $100K annually
- **Capabilities:**
  - Can build most features with some guidance
  - May need support on complex architecture decisions
  - Can write solid, maintainable code
  - Needs code reviews

### **Junior Full-Stack Developer** (Not Recommended Alone)
- **Years of Experience:** 0-2 years
- **Salary Range:** $35K - $60K annually
- **Limitations:**
  - Should work under supervision
  - Good for implementing well-defined features
  - Not suitable as sole developer for this complexity

---

## Specific Technology Stack Summary

### Frontend Stack:
```
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS 4
- SWR or React Query (data fetching)
- Shadcn/ui (components)
```

### Backend Stack:
```
- Next.js API Routes
- Node.js
- PostgreSQL (via Supabase)
- Supabase Auth
```

### Infrastructure:
```
- Vercel (hosting)
- Supabase (database + auth)
- GitHub (version control)
```

### Third-Party Services:
```
- Stripe (payments)
- Twilio (SMS)
- SendGrid (email)
- Google Maps API
- Vercel Blob (file storage)
```

---

## Hiring Checklist

### Technical Interview Questions:
1. "Walk me through building a protected API route in Next.js"
2. "How would you design a database schema for a healthcare wallet system?"
3. "Explain how you'd implement Supabase authentication with protected routes"
4. "How would you handle payment processing with webhooks?"
5. "Describe your approach to testing and deployment"

### Skill Assessment:
- Portfolio with React/Next.js projects
- GitHub contributions showing code quality
- Previous healthcare, fintech, or payment system experience
- Understanding of security and compliance basics (HIPAA, PCI-DSS)

### Red Flags:
- No TypeScript experience
- Limited React/Next.js experience
- No database design experience
- Cannot explain why security matters in healthcare apps
- Reluctant to discuss architectural decisions

---

## Timeline & Cost Estimation

| Feature | Complexity | Estimated Hours | Cost (@ $100/hr) |
|---------|-----------|-----------------|-----------------|
| Database Design | Medium | 20 | $2,000 |
| Auth System | High | 30 | $3,000 |
| Wallet System | High | 40 | $4,000 |
| Emergency Module | High | 35 | $3,500 |
| Healthcare Finder | Medium | 25 | $2,500 |
| Payment Integration | High | 40 | $4,000 |
| UI/Frontend Pages | Medium | 50 | $5,000 |
| Testing & QA | Medium | 30 | $3,000 |
| Deployment & DevOps | Low | 15 | $1,500 |
| **TOTAL** | - | **285 hours** | **$28,500** |

**Timeline:** 7-9 weeks with one full-time developer

---

## Recommended Team Structure

### Option 1: Single Senior Developer
- Most cost-effective
- Requires 5+ years experience
- Timeline: 8-10 weeks

### Option 2: One Senior + One Mid-Level Developer
- Better for 6-8 week timeline
- Senior handles architecture, mid-level handles features
- Allows for better code review

### Option 3: Full Team (Recommended for 4-week deadline)
- 1 Senior Full-Stack (architecture, complex features)
- 1 Mid-Level Full-Stack (frontend & API routes)
- 1 QA/Testing (automated + manual testing)
- Timeline: 4-5 weeks

---

## Training Resources (if hiring junior-oriented candidates)

### Must Learn Before Starting:
1. Next.js 16 - Official tutorials (5 hours)
2. Supabase Fundamentals - Official docs (3 hours)
3. TypeScript Basics - Udemy course (5 hours)
4. Tailwind CSS - Official docs (3 hours)

### On-the-Job Learning:
- Pair programming with senior developer
- Code review feedback
- Architecture discussions
- Production deployment experience

---

## Security & Compliance Skills

The developer MUST understand:
- SQL injection prevention
- XSS (Cross-Site Scripting) protection
- CSRF (Cross-Site Request Forgery) protection
- HIPAA requirements for healthcare data
- PCI-DSS for payment processing
- Data encryption (in transit and at rest)
- Environment variable security
- Database access control (RLS)

---

## Conclusion

**Recommended Hire:** Senior Full-Stack Developer with 5+ years experience in:
- Modern React/Next.js development
- Full-stack Node.js applications
- PostgreSQL database design
- Payment system integrations
- Healthcare or fintech background (a plus)

This project is **not suitable for junior developers alone** due to its complexity involving healthcare data, payments, and real-time features. The right hire will be able to architect the system, handle security concerns, and deliver production-ready code.
