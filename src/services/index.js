import province from './province.service'
import district from './district.service'
import ward from './ward.service'
import account from './account.service'
import criteria from './criteria.service'
import discover from './discover.service'
import image from './image.service'
import motelRoom from './motelRoom.service'
import post from './post.service'
import search from './search..service'

class Services {
    constructor() {
        this.province = province
        this.district = district
        this.ward = ward
        this.account = account
        this.criteria = criteria
        this.discover = discover
        this.image = image
        this.motelRoom = motelRoom
        this.post = post
        this.search = search
    }
}

export default new Services()