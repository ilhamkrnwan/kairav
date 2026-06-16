---
title: Santap
description: A modern POS and QR ordering platform for restaurants, cafes, and F&B MSMEs featuring cashier systems, kitchen workflow, open bill sessions, QRIS payment, and customer web ordering
image: /portofolio/santap/preview.avif
category: Web & Mobile App
services:
  - Full-Stack Development
  - Mobile App Development
  - REST API Development
  - Payment Gateway Integration
  - System Architecture
client: PT Sarwa Kalyana Cara
date: 2026-01-01
status: In Development
industry: Food & Beverage Technology
tags:
  - Laravel
  - Nuxt.js
  - Flutter
  - PostgreSQL
  - Filament
  - QRIS
  - Supabase
  - Mobile-First
_path: /portofolio/santap
url: https://santap.app
---

# Santap — POS and QR Ordering Platform for F&B Businesses

Santap is a digital platform designed to help restaurants, cafes, and F&B MSMEs manage ordering, payment, cashier, kitchen, and outlet operations in a single ecosystem. The system combines web-based customer ordering, mobile apps for cashiers and kitchens, an admin dashboard, and a robust backend API tailored for modern culinary operations.

![Interface Santap](/portofolio/santap/preview.avif)

## Problem

Many F&B businesses still rely on manual processes to record orders, manage tables, process payments, and forward orders to the kitchen. This manual workflow is prone to order entry errors, long queues, miscommunication between waitstaff and kitchen teams, and makes it difficult to track order statuses in real-time.

Furthermore, existing POS solutions are often too complex, expensive, or lack flexibility for small-to-medium restaurants. F&B businesses need a system that is easy to use, mobile-friendly, supports QR ordering, and remains highly reliable for daily operations.

## Solution

Santap was built as a POS and QR ordering platform that seamlessly connects customers, cashiers, kitchen staff, and admins in one system:

* **Customer QR Ordering** — Customers scan a table QR code to browse the menu, select variants/add-ons, add custom notes, and place orders directly from their mobile browser
* **Cashier Mobile App** — An app for cashiers to take orders, manage payments, open bill sessions, and monitor active orders
* **Kitchen Workflow** — A dedicated kitchen view to receive, organize, and process incoming food and beverage orders systematically
* **Open Bill System** — Support for session-based ordering, allowing customers to add multiple items to their bill before making a final payment
* **QRIS Payment Integration** — Integrated QRIS payments with automatic payment status checks, cancellations, timeouts, and verification
* **Admin Dashboard** — A Filament-based admin panel to manage organizations, outlets, tables, menus, products, and operational configurations
* **Multi-Organization Architecture** — Designed to support multi-tenant structures, enabling multiple restaurants or outlets to use the platform with complete data isolation
* **Mobile-First Experience** — Both the customer web portal and the cashier/kitchen mobile apps are responsive and optimized for fast-paced, on-the-field usage

## Ilham's Role

As **Fullstack Web & Mobile Developer**, Ilham was responsible for:

* Developing the customer web ordering portal using Nuxt.js
* Building the backend REST API using Laravel
* Designing table QR ordering, order details, shopping cart, checkout, and open bill session flows
* Integrating QRIS payments (handling creation, status checking, cancellations, and timeouts)
* Developing multi-organization data structures, managing orders, items, dining tables, and session billing
* Building the admin dashboard panel using Filament
* Developing and customizing the mobile Flutter applications for cashiers and kitchens
* Creating self-documenting API structures using Scramble
* Optimizing the UI/UX across customer, cashier, and admin views for faster, error-free operations

## Tech Stack

| Layer             | Technology                                 |
| ----------------- | ------------------------------------------ |
| Frontend Customer | Nuxt.js, Vue, Nuxt UI, Tailwind CSS, Pinia |
| Mobile App        | Flutter                                    |
| Backend API       | Laravel, Sanctum, Scramble                 |
| Admin Dashboard   | Filament                                   |
| Database          | PostgreSQL                                 |
| Payment           | QRIS Integration                           |
| Realtime / Sync   | Polling, Reverb-ready Architecture         |
| Deployment        | VPS, Vercel                                |
| Storage & Media   | Spatie Media Library                       |

## Impact and Results

* Empowering F&B businesses to reduce manual work in ordering, billing, and kitchen communication
* Accelerating the customer lifecycle from QR scan to order processing
* Streamlining cashier operations for order creation, active order monitoring, and payment collection
* Supporting restaurant-specific dining scenarios like table management, takeaway, dine-in, and open bill sessions
* Providing a highly scalable POS foundation ready for multi-tenant and multi-outlet expansion
* Improving order accuracy through structured database representations of order items, variants, add-ons, payments, and billing statuses

![Santap Mockup 1](/portofolio/santap/1.avif)
![Santap Mockup 2](/portofolio/santap/2.avif)
![Santap Mockup 3](/portofolio/santap/3.avif)
![Santap Mockup 4](/portofolio/santap/4.avif)
