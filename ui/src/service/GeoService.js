import {BaseService} from "./BaseService";

export class GeoService extends BaseService {
    getAllProvince = () => {
        return this.get("https://dc.tintoc.net/app/api-customer/public/provinces?page=0&size=100")
            .then(list => list.map(province => {
                return {
                    id: province.id,
                    text: province.name
                }
            }).sort(this.sortById));
    }

    getAllDistrictByProvinceId = (id) => {
        return this.get("https://dc.tintoc.net/app/api-customer/public/districts", {
            page: 0,
            size: 100,
            "provinceId.equals": id,
        }).then(list => list.map(district => {
            return {
                id: district.id,
                text: district.name
            }
        }).sort(this.sortById))
    }

    getAllWardsByDistrictId = (id) => {
        return this.get("https://dc.tintoc.net/app/api-customer/public/wards", {
            page: 0,
            size: 100,
            "districtId.equals": id,
        }).then(list => list.map(ward => {
            return {
                id: ward.id,
                text: ward.name
            }
        }).sort(this.sortById))
    }

    sortById = (province, otherProvince) => province.id - otherProvince.id

}