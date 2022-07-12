import clsx from 'clsx';

export const DEFAULT_BUTTON_STYLES = clsx([
  'flex h-[2.5rem] duration-200 ease-out items-center justify-center overflow-hidden rounded-full bg-offBlack p-4 text-sm font-bold text-white disabled:opacity-20',
  'hover:opacity-80',
]);

const DEFAULT_CLASSES =
  'w-full border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

const VARIANT_CLASSES = {
  primary:
    'bg-primary  text-white  hover:bg-primary-dark  focus:ring-offset-white-warm focus:ring-primary',
  secondary:
    'bg-white  border-stone-200  hover:border-primary-lighter  focus:ring-offset-white-warm focus:ring-primary  text-primary  hover:bg-primary-lightest',
};

export const BUTTON_PRIMARY_CLASSES = `${DEFAULT_CLASSES} ${VARIANT_CLASSES.primary}`;
export const BUTTON_SECONDARY_CLASSES = `${DEFAULT_CLASSES} ${VARIANT_CLASSES.secondary}`;

export const COLLECTION_PAGE_SIZE = 12;
