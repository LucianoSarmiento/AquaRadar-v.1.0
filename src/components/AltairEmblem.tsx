import React from 'react';

interface AltairEmblemProps {
  className?: string;
  size?: number;
}

export const AltairEmblem: React.FC<AltairEmblemProps> = ({
  className = 'w-4 h-4',
  size = 18,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Laurel Wreath Border */}
      <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="currentColor">
        {/* Left Laurel Arch */}
        <path d="M 140 420 C 70 370 45 280 65 180" fill="none" strokeWidth="8" />
        <path d="M 68 190 C 45 180 40 160 52 145 C 65 160 70 178 68 190 Z" />
        <path d="M 80 235 C 50 225 45 205 58 190 C 72 205 80 223 80 235 Z" />
        <path d="M 95 280 C 60 275 52 253 68 237 C 82 253 94 270 95 280 Z" />
        <path d="M 115 330 C 75 330 65 305 85 290 C 100 305 110 320 115 330 Z" />
        <path d="M 140 380 C 95 385 82 360 105 343 C 120 360 132 373 140 380 Z" />
        <path d="M 175 425 C 130 435 115 410 138 393 C 158 410 170 420 175 425 Z" />

        {/* Right Laurel Arch */}
        <path d="M 372 420 C 442 370 467 280 447 180" fill="none" strokeWidth="8" />
        <path d="M 444 190 C 467 180 472 160 460 145 C 447 160 442 178 444 190 Z" />
        <path d="M 432 235 C 462 225 467 205 454 190 C 440 205 432 223 432 235 Z" />
        <path d="M 417 280 C 452 275 460 253 444 237 C 430 253 418 270 417 280 Z" />
        <path d="M 397 330 C 437 330 447 305 427 290 C 412 305 402 320 397 330 Z" />
        <path d="M 372 380 C 417 385 430 360 407 343 C 392 360 380 373 372 380 Z" />
        <path d="M 337 425 C 382 435 397 410 374 393 C 354 410 342 420 337 425 Z" />
      </g>

      {/* Top Fleur-de-lis */}
      <g fill="currentColor">
        <path d="M 256 22 C 266 48 280 70 266 96 C 256 94 256 94 246 96 C 232 70 246 48 256 22 Z" />
        <path d="M 250 72 C 230 54 205 62 208 86 C 210 102 234 98 248 90 Z" />
        <path d="M 262 72 C 282 54 307 62 304 86 C 302 102 278 98 264 90 Z" />
        <rect x="236" y="94" width="40" height="7" rx="2" />
      </g>

      {/* Shield Outline */}
      <path
        d="M 256 115 L 380 140 L 392 295 L 256 465 L 120 295 L 132 140 Z"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Spreading Eagle Silhouette with Inner Cutouts */}
      <g fill="currentColor">
        {/* Left Wing Outer Feathers */}
        <path d="M 240 215 C 190 165 115 100 50 68 C 82 110 115 148 135 190 Z" />
        <path d="M 225 232 C 175 192 110 142 65 110 C 95 150 125 188 145 224 Z" />
        <path d="M 215 248 C 170 218 115 180 82 155 C 108 190 138 222 158 252 Z" />
        <path d="M 205 264 C 170 238 128 212 102 195 C 125 222 150 250 170 274 Z" />
        <path d="M 195 280 C 170 262 142 242 125 230 C 144 250 162 270 180 290 Z" />

        {/* Right Wing Outer Feathers */}
        <path d="M 272 215 C 322 165 397 100 462 68 C 430 110 397 148 377 190 Z" />
        <path d="M 287 232 C 337 192 402 142 447 110 C 417 150 387 188 367 224 Z" />
        <path d="M 297 248 C 342 218 397 180 430 155 C 404 190 374 222 354 252 Z" />
        <path d="M 307 264 C 342 238 384 212 410 195 C 387 222 362 250 342 274 Z" />
        <path d="M 317 280 C 342 262 370 242 387 230 C 368 250 350 270 332 290 Z" />

        {/* Inner Wing Panels */}
        <path d="M 230 220 C 185 200 145 218 135 255 C 160 272 200 282 225 288 Z" />
        <path d="M 282 220 C 327 200 367 218 377 255 C 352 272 312 282 287 288 Z" />

        {/* Eagle Tail Feathers */}
        <path d="M 256 345 L 238 410 L 256 428 L 274 410 Z" />
        <path d="M 245 348 L 210 405 L 232 418 L 250 382 Z" />
        <path d="M 267 348 L 302 405 L 280 418 L 262 382 Z" />
        <path d="M 235 352 L 188 390 L 208 402 L 238 378 Z" />
        <path d="M 277 352 L 324 390 L 304 402 L 274 378 Z" />

        {/* Talons */}
        <path d="M 215 320 C 205 340 185 345 180 355 C 192 355 205 348 215 340 C 220 352 228 355 235 348 C 235 340 225 330 222 320 Z" />
        <path d="M 297 320 C 307 340 327 345 332 355 C 320 355 307 348 297 340 C 292 352 284 355 277 348 C 277 340 287 330 290 320 Z" />

        {/* Eagle Head & Beak Profile */}
        <path
          d="M 236 185 C 236 152 250 138 270 138 C 288 138 300 150 298 168 C 288 175 290 182 278 205 C 265 215 246 215 236 185 Z"
        />
        <path
          d="M 288 152 C 302 152 312 158 310 168 C 300 174 292 172 284 170 Z"
        />
      </g>

      {/* Eagle Body Negative Space Cutouts */}
      <ellipse
        cx="256"
        cy="275"
        rx="28"
        ry="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
    </svg>
  );
};

