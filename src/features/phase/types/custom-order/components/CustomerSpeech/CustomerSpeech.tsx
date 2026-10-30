import "./CustomerSpeech.css";

interface CustomerSpeechProps {
    image: string;
    text: string;
}

export function CustomerSpeech({ image, text }: CustomerSpeechProps) {
    return (
        <div className="customer-speech">
            <img src={image} alt="" className="customer-speech-image" />
            <p className="customer-speech-bubble">{text}</p>
        </div>
    );
}