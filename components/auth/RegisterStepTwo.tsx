type StepTwoProps = {
  fullName: string;
  phone: string;
  onChange: (field: "fullName" | "phone", value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function RegisterStepTwo({
  fullName,
  phone,
  onChange,
  onNext,
  onBack,
}: StepTwoProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) return;
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="step2-fullname"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Full name
        </label>
        <input
          id="step2-fullname"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="step2-phone"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Phone number
        </label>
        <input
          id="step2-phone"
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
          placeholder="+1 555 000 0000"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:w-auto"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

