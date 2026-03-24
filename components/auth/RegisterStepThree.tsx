type StepThreeProps = {
  username: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
};

export function RegisterStepThree({
  username,
  onChange,
  onBack,
  onSubmit,
  loading,
  error,
}: StepThreeProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
        >
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="step3-username"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Username
        </label>
        <input
          id="step3-username"
          type="text"
          required
          value={username}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
          placeholder="yourname"
        />
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
          This is how supporters will see you on CupShai.
        </p>
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
          disabled={loading}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
        >
          {loading ? "Creating account…" : "Finish and go to dashboard"}
        </button>
      </div>
    </form>
  );
}

