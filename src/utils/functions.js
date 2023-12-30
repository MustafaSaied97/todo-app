export function getUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
export function getCurrentDate() {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}
export function LocalStorage({ type, key, value, callBack }) {
    if (!window?.localStorage) return;

    const localStorageAppKey = 'todp-app';
    const localStorageBasicData = {
        theme: 'light',
    };
    //check if local storage exist or not
    if (!localStorage.getItem(localStorageAppKey)) {
        //if not---add localStorageBasicData
        localStorage.setItem(localStorageAppKey, JSON.stringify(localStorageBasicData));
    }

    switch (type) {
        case 'set': {
            if (!key) return;
            const storageCopy = LocalStorage({ type: 'get' });
            localStorage.setItem(localStorageAppKey, JSON.stringify({ ...storageCopy, [key]: value }));
            window.dispatchEvent(new Event('storage')); // triggers the localstorage event listener(s)
            return;
        }
        case 'get': {
            let storageCopy = JSON.parse(localStorage.getItem(localStorageAppKey));
            return key ? storageCopy[key] ?? null : storageCopy;
        }
        case 'delete': {
            let storageCopy = JSON.parse(localStorage.getItem(localStorageAppKey));
            if (storageCopy && key in storageCopy) {
                delete storageCopy[key];
                localStorage.setItem(localStorageAppKey, JSON.stringify({ ...storageCopy }));
            }
            break;
        }
        case 'reset': {
            localStorage.setItem(localStorageAppKey, JSON.stringify(localStorageBasicData));
            window.dispatchEvent(new Event('storage'));
            break;
        }
        case 'listener': {
            if (typeof callBack !== 'function') return;
            window.addEventListener('storage', () => {
                return callBack(LocalStorage({ type: 'get' }));
            });
            break;
        }
        case 'clear': {
            localStorage.setItem(localStorageAppKey, JSON.stringify({}));
            window.dispatchEvent(new Event('storage'));
            return;
        }
        default:
            () => { };
    }
};

export function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        let isSupported = 'navigator' in window && 'geolocation' in navigator;

        const success = (position) => {
            const coordinates = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            resolve(coordinates);
        }

        const error = (error) => {
            console.error("Error getting location:", error);
            reject(error);
        }

        const options = {
            enableHighAccuracy: true,
            maximumAge: 2000,
            timeout: 1000 * 5
        };

        if (isSupported) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            reject(new Error('Geolocation is not supported in this browser.'));
        }
    });
};


 //convert  temperature to Celcius or Fahrenheit or Kelvin
 export function convertTempTo(temp,convertToUnit="C-F") {
            
    if(convertToUnit.toUpperCase()==="C-F"){
        return ((temp * 9) / 5 + 32).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="F-C"){
        return ((temp-32)/1.8).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="K-F"){
        return (((294.97*temp)-273.15)*(9/5)+32).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="F-K"){ 
        return (((294.97*temp)-32)*(5/9)+273.15).toFixed(1);;
    }else if(convertToUnit.toUpperCase()==="K-C"){
        return (temp-273.15).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="C-K"){
        return (temp+273.15).toFixed(1);
    }
    
}