import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export default function CustomQRCode({ url, size = 256, preset = 'modern', styleOptions = {} }) {
    const ref = useRef(null);
    const qrCode = useRef(null);

    const baseColor = '#1C5E8FE6';

    const presets = {
        modern: {
            dotsOptions: { type: 'dots', color: baseColor },
            cornersSquareOptions: { type: 'extra-rounded', color: baseColor },
            cornersDotOptions: { type: 'dot', color: baseColor }
        },
        tech: {
            dotsOptions: { type: 'square', color: baseColor },
            cornersSquareOptions: { type: 'square', color: baseColor },
            cornersDotOptions: { type: 'square', color: baseColor }
        },
        fluid: {
            dotsOptions: { type: 'rounded', color: baseColor },
            cornersSquareOptions: { type: 'extra-rounded', color: baseColor },
            cornersDotOptions: { type: 'dot', color: baseColor }
        },
        classy: {
            dotsOptions: { type: 'classy', color: baseColor },
            cornersSquareOptions: { type: 'extra-rounded', color: baseColor },
            cornersDotOptions: { type: 'dot', color: baseColor }
        },
        gradient: {
            dotsOptions: { 
                type: 'dots',
                gradient: {
                    type: 'linear',
                    rotation: 45,
                    colorStops: [
                        { offset: 0, color: '#1C5E8F' }, 
                        { offset: 1, color: '#60B4D9' }  
                    ]
                }
            },
            cornersSquareOptions: { type: 'extra-rounded', color: baseColor },
            cornersDotOptions: { type: 'dot', color: baseColor }
        }
    };

    useEffect(() => {
        const selectedStyle = presets[preset] || presets.modern;

        const defaultConfig = {
            width: size,
            height: size,
            type: 'svg',
            data: url,
            image: '/images/logo.png',
            margin: 10,
            qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' },
            imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 5, crossOrigin: 'anonymous' },
            backgroundOptions: { color: '#ffffff' },
        };

        const config = {
            ...defaultConfig,
            ...selectedStyle,
            ...styleOptions,
            dotsOptions: { 
                ...selectedStyle.dotsOptions, 
                ...styleOptions.dotsOptions 
            },
            cornersSquareOptions: { 
                ...selectedStyle.cornersSquareOptions, 
                ...styleOptions.cornersSquareOptions 
            },
            cornersDotOptions: { 
                ...selectedStyle.cornersDotOptions, 
                ...styleOptions.cornersDotOptions 
            },
        };

        qrCode.current = new QRCodeStyling(config);

        if (ref.current) {
            ref.current.innerHTML = '';
            qrCode.current.append(ref.current);
        }
    }, [url, size, preset, styleOptions]);

    return (
        <div ref={ref} className="p-4 bg-white rounded-3xl shadow-xl inline-block" />
    );
}