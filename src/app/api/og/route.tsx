import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'OS_Gitfolio';
    const description = searchParams.get('description') || 'GitHub Contribution Visualizer';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#050508',
            color: '#f5f5fa',
            fontFamily: 'sans-serif',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '20px', background: 'linear-gradient(to right, #3b82f6, #22d3ee)', backgroundClip: 'text', color: 'transparent' }}>
            {title}
          </h1>
          <p style={{ fontSize: '30px', color: '#c4c4d4' }}>
            {description}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
