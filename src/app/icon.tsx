import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '900',
          borderRadius: '25%',
          boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        O
      </div>
    ),
    {
      ...size,
    }
  );
}
