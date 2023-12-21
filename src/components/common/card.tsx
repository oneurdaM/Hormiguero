import cn from 'classnames'

type Props = {
  className?: string
  [key: string]: unknown
}

const Card: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('rounded bg-light shadow-md shadow-border-400', className)} {...props} />
  )
}

export default Card
