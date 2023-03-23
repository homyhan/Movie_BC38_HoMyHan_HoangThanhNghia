import { https } from "./config";

export const movieServ = {
    getBanners: ()=>{
        return https.get("/QuanLyPhim/LayDanhSachBanner");
    },
    getMoviesList:(soTrang)=>{
        return  https.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", 
        {params: {
          maNhom: "GP01",
          soTrang,
          soPhanTuTrenTrang: 8,
        }})
    },
    getScheduleByTheater:()=>{
        return https.get("/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01");
    },
    getScheduleDetail(id){
        const url = "/QuanLyDatVe/LayDanhSachPhongVe";
        return https.get(url, {
            params:{
                MaLichChieu: id
            }
        })
    },
    getThongTinLichChieuPhim(id){
        return https.get("/QuanLyRap/LayThongTinLichChieuPhim?MaPhim="+id);
    },
    getDanhSachGheDangDat(id){
            const url = "/QuanLyDatVe/LayDanhSachPhongVe";
            return https.get(url, {
                params:{
                    maGhe: id
                }
            })
    },
    datVe: (thongTinDatVe)=>{        
        return https.post("/QuanLyDatVe/DatVe", thongTinDatVe)
    },
}