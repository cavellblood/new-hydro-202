import clsx from 'clsx';
import {DEFAULT_BUTTON_STYLES} from '../../constants';
import type {SanityLink} from '../../types';
import {Link} from '~/components';

type Props = {
  backgroundColor?: string;
  className?: string;
  link: SanityLink;
  textColor?: string;
};

export const LinkButton = ({
  backgroundColor,
  className,
  link,
  textColor,
}: Props) => {
  return (
    <Link
      className={clsx(DEFAULT_BUTTON_STYLES, className)}
      link={link}
      style={{background: backgroundColor, color: textColor}}
    >
      {link.title}
    </Link>
  );
};
