export default function Label({ id, label, isRequired }: { id: string; label: string; isRequired?: boolean }) {
    return (
        <label
            htmlFor={id}
            className="block text-left font-lato text-sm font-bold tracking-widest text-muted uppercase mb-1.5">
            {label}
            {isRequired && <span className="text-red-500">*</span>}
        </label>

    )
}
