import { Header } from '../dashboard/components/Header';
import { User } from '../types/interfaces';
interface HeaderWrapperProps {
    user: User,
}
 const HeaderWrapper = ({ user }: HeaderWrapperProps) => {
  return (
    <div>
            <Header user={user} />
    </div>
  )
}


export default HeaderWrapper;
