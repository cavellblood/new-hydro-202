import clsx from 'clsx';
import {HTMLAttributes} from 'react';

type Props = HTMLAttributes<HTMLButtonElement>;

export const CircleButton = (props: Props) => {
  const {className, ...rest} = props;

  return (
    <button
      className={clsx([
        'aspect-square flex w-[2.875rem] items-center justify-center rounded-full bg-white text-sm font-bold duration-200 hover:bg-opacity-70',
        className,
      ])}
      type="button"
      {...rest}
    />
  );
};
