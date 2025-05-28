import BleManager from 'react-native-ble-manager';

// Bluetooth 초기화
BleManager.start({ showAlert: false }).then(() => {
    console.log('Bluetooth 모듈이 초기화되었습니다.');

    // 기기 검색 시작
    BleManager.scan([], 5, true).then(() => {
        console.log('기기 검색 시작');
    });
});

// 기기 연결
BleManager.connect('device_uuid').then(() => {
    console.log('기기 연결 성공');

    // 데이터 전송
    const data = '';
    BleManager.write('FEN', data).then(() => {
        console.log('데이터 전송 완료');
    }).catch((error) => {
        console.log('데이터 전송 실패', error);
    });

    // 데이터 수신 시작
    BleManager.startNotification('FEN').then(() => {
        console.log('데이터 수신 시작');
    });

    // 데이터 수신 리스너 추가
    BleManager.addListener('BleManagerDidUpdateValueForCharacteristic', ({ value }) => {
        console.log('FEN 데이터:', value);
    });
}).catch((error) => {
    console.log('기기 연결 실패', error);
});

// Android 권한 설정
/*<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>

<key>NSBluetoothAlwaysUsageDescription</key>
<string>Bluetooth 기능을 사용하여 주변 기기와 통신합니다.</string>
<key>NSLocationWhenInUsageDescription</key>
<string>Bluetooth 기기 검색을 위해 위치 정보를 사용합니다.</string>*/
