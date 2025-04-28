import { useState, useEffect, useCallback } from 'react';
import { Platform, PermissionsAndroid, Permission, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, PermissionStatus } from 'react-native-permissions';

type PermissionType = 
  | 'camera'
  | 'photoLibrary'
  | 'microphone'
  | 'contacts'
  | 'location'
  | 'storage'
  | 'notifications';

interface PermissionResult {
  granted: boolean;
  status: PermissionStatus;
  request: () => Promise<boolean>;
}

/**
 * A hook for managing permissions
 * @param permissionType The type of permission to check
 * @returns Permission status and request function
 */
function usePermissions(permissionType: PermissionType): PermissionResult {
  const [status, setStatus] = useState<PermissionStatus>(RESULTS.UNAVAILABLE);

  const getPermission = useCallback(() => {
    switch (permissionType) {
      case 'camera':
        return Platform.select({
          ios: PERMISSIONS.IOS.CAMERA,
          android: PERMISSIONS.ANDROID.CAMERA,
        });
      case 'photoLibrary':
        return Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        });
      case 'microphone':
        return Platform.select({
          ios: PERMISSIONS.IOS.MICROPHONE,
          android: PERMISSIONS.ANDROID.RECORD_AUDIO,
        });
      case 'contacts':
        return Platform.select({
          ios: PERMISSIONS.IOS.CONTACTS,
          android: PERMISSIONS.ANDROID.READ_CONTACTS,
        });
      case 'location':
        return Platform.select({
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        });
      case 'storage':
        return Platform.select({
          ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
          android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        });
      case 'notifications':
        return Platform.select({
          ios: PERMISSIONS.IOS.NOTIFICATIONS,
          android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        });
      default:
        return null;
    }
  }, [permissionType]);

  const checkPermission = useCallback(async () => {
    const permission = getPermission();
    if (!permission) return RESULTS.UNAVAILABLE;

    try {
      const result = await check(permission);
      setStatus(result);
      return result;
    } catch (error) {
      console.error('Error checking permission:', error);
      return RESULTS.UNAVAILABLE;
    }
  }, [getPermission]);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const permission = getPermission();
    if (!permission) return false;

    try {
      const result = await request(permission);
      setStatus(result);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return false;
    }
  }, [getPermission]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    granted: status === RESULTS.GRANTED,
    status,
    request: requestPermission,
  };
}

export default usePermissions;
