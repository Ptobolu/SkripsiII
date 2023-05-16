import AsyncStorage from '@react-native-async-storage/async-storage';

export const simpanDataUser = async(response) => {
    try {
        await AsyncStorage.setItem('dataUser', JSON.stringify(response));
    } catch (e) {
        alert('Gagal menyimpan data, silahkan coba lagi.');
    }
}

export const hapusDataUser = async() => {
    try {
        await AsyncStorage.removeItem('dataUser');
        return true;
    } catch (e) {
        alert('Gagal menghapus data user, silahkan coba lagi.');
    }
}

export const ambilDataUser = async () => {
    try {
        const data = await AsyncStorage.getItem('dataUser')
        if(data !== null) {
            return JSON.parse(data);
        } else {
            return '';
        }
    } catch(e) {
        alert('Gagal mengambil data, silahkan coba lagi.');
    }
}

export const simpanLaporanAktif = async(response) => {
    try {
        await AsyncStorage.setItem('laporanAktif', JSON.stringify(response));
    } catch (e) {
        alert('Gagal menyimpan data, silahkan coba lagi.');
    }
}

export const hapusLaporanAktif = async() => {
    try {
        await AsyncStorage.removeItem('laporanAktif');
        return true;
    } catch (e) {
        alert('Gagal menghapus data laporan, silahkan coba lagi.');
    }
}

export const ambilLaporanAktif = async () => {
    try {
        const data = await AsyncStorage.getItem('laporanAktif')
        if(data !== null) {
            return JSON.parse(data);
        } else {
            return '';
        }
    } catch(e) {
        alert('Gagal mengambil data, silahkan coba lagi.');
    }
}

export const isLoggedIn = async () => {
    try {
        const data = await AsyncStorage.getItem('dataUser')
        if(data !== null) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert('Gagal mengambil data, silahkan coba lagi.');
    }
}