import CallIcon from "@material-ui/icons/Call"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"
import MailIcon from "@material-ui/icons/MailOutline"
import LocationIcon from "@material-ui/icons/LocationOn"

export const contacts = [
  {
    contact: "+233 23 456 7890",
    icon: <CallIcon fontSize="small" />,
    get href() {
      return "tel:" + this.contact.split(" ").join("")
    }
  },
  {
    contact: "+233 23 456 7890",
    icon: <WhatsAppIcon fontSize="small" />,
    get href() {
      return "https://wa.me/" + this.contact.substring(1).split(" ").join("")
    }
  },
  {
    contact: "johndoe@gmail.com",
    icon: <MailIcon fontSize="small" />,
    get href() {
      return "mailto:" + this.contact
    }
  },
  {
    contact: "Shama, Beach Road",
    icon: <LocationIcon fontSize="small" />
  }
]
