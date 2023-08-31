# Auto Twitch Compiler - Frontend

Welcome to the frontend interface of Auto Twitch Compiler, a web-app that simplifies the process of creating YouTube channels that curate and compile clips from Twitch categories, presenting them as seamless video compilations on YouTube.

## Overview

The frontend is built on the powerful **Next.js** framework, a leap from the previously used Create React App (CRA). This shift brings improved performance, better SEO capabilities, and a more robust development environment, ensuring a seamless user experience.

We've also transitioned our hosting from Firebase to **Vercel**, aligning with our objective to leverage top-tier cloud platforms that align with our tech stack and optimize our delivery pipeline.

Furthermore, we've migrated our database operations from Firebase to **MongoDB Atlas**. This not only allows us to scale our operations more effectively but also offers more flexibility and control over our data models and operations.

## Features

- **User Customization**: Select Twitch categories, define languages, and set the quantity for a tailor-made video compilation.
- **Real-time Feedback**: Get updates on the video processing status directly within the app.
- **Responsive Design**: Whether on desktop or mobile, enjoy a responsive design for a seamless experience.

## Link to Backend Services

The intricate video processing workflow, from curation to final video assembly, is handled by our serverless backend hosted on AWS. For a deep dive into our backend architecture and services, visit the [backend repository](https://github.com/thomasreichmann/vidsync-sam).

## Development & Setup

1. Ensure you have the required Node version:
    
    - Node version: v19.4.0
    
1. Install the necessary dependencies:
    
    `npm install`
    
3. To run the development server:
    
    `npm run dev`
    
4. Navigate to `http://localhost:3000/` to see the app in action.
## Contributions

Pull requests are welcome. For significant changes, please open an issue first to discuss the proposed changes.
