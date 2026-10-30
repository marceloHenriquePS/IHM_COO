import "./DestinationSwitch.css";

interface DestinationSwitchProps {
    options: { id: string; label: string; icon: string }[];
    value: string;
    disabled?: boolean;
    onChange: (id: string) => void;
}

export function DestinationSwitch({ options, value, disabled, onChange }: DestinationSwitchProps) {
    const index = Math.max(0, options.findIndex((o) => o.id === value));

    return (
        <fieldset className="dest-switch" disabled={disabled}>
            <legend className="visually-hidden">Destino do atributo</legend>

            <div className="dest-switch-options">
                {options.map((o) => (
                    <label key={o.id} className="dest-switch-option">
                        <input
                            type="radio"
                            name="destination"
                            className="visually-hidden"
                            checked={value === o.id}
                            onChange={() => onChange(o.id)}
                        />
                        <img src={o.icon} alt="" />
                        <span className="visually-hidden">{o.label}</span>
                    </label>
                ))}
            </div>

            <div
                className="dest-switch-track"
                aria-hidden="true"
                onClick={() => {
                    if (!disabled) onChange(options[index === 0 ? 1 : 0].id);
                }}
            >
                <div
                    className="dest-switch-thumb"
                    style={{ transform: `translateX(${index * 100}%)` }}
                />
            </div>
        </fieldset>
    );
}