import { Switch } from '@headlessui/react';

export default function Toggle({ enabled, onChange, label }) {
    return (
        <Switch.Group>
            <div className="flex items-center justify-between py-2">
                <Switch.Label className="mr-4 text-[#1A3463]/80 text-md font-medium">
                    {label}
                </Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={onChange}
                    className={`${
                        enabled ? 'bg-[#1C5E8F]' : 'bg-gray-200'
                    } relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#60B4D9] focus:ring-offset-2 cursor-pointer`}
                >
                    <span
                        className={`${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm`}
                    />
                </Switch>
            </div>
        </Switch.Group>
    );
}