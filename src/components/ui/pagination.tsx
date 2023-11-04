import RCPagination, { PaginationProps } from 'rc-pagination'
import { ArrowNext } from '@/components/icons/arrow-next'
import { ArrowPrev } from '@/components/icons/arrow-prev'
import 'rc-pagination/assets/index.css'
import { useThemeMode } from '@/utils/useThemeMode'
const Pagination: React.FC<PaginationProps> = (props) => {
  const { isDarkMode } = useThemeMode()
  return (
    <RCPagination
      nextIcon={<ArrowNext color={isDarkMode ? 'white' : 'black'} />}
      prevIcon={<ArrowPrev color={isDarkMode ? 'white' : 'black'} />}
      {...props}
    />
  )
}

export default Pagination
