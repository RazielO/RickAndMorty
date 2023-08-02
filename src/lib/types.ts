export interface FilterSelectProps {
    label: string;
    id: string;
    placeholder: string;
    value: any;
    options: { value: string; display: string }[];
    onChange: any;
    selected: string;
};

export interface FilterInputProps {
    label: string;
    id: string;
    placeholder: string;
    type: string;
    value: any;
    onChange: any;
};

export interface CharacterFilter {
    name?: string;
    species?: string;
    status?: string;
    gender?: string;
    type?: string;
}