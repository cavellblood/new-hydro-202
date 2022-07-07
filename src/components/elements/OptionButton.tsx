import clsx from 'clsx';

type Props = {
  checked?: boolean;
  label: string;
};

export const OptionButton = ({checked, label}: Props) => {
  return (
    <div
      className={clsx([
        'text-darkGray cursor-pointer rounded-[6px] border px-3 py-2 text-sm leading-none',
        checked ? 'border-black text-black' : 'border-lightGray',
      ])}
    >
      {label}
    </div>
  );
};
