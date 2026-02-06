import { LoadText } from '../Loaders/LoadText/LoadText'

export const MyStaticInfo = () => (
  <div className="flex flex-col gap-4">
    <p><LoadText keyName="contact.email" /></p>
    <p><LoadText keyName="contact.phone" /></p>
    <p><LoadText keyName="contact.address" /></p>
  </div>
)
