import { error, success } from "helpers/return";
import { DeviceRepository } from "modules/device/device.repository";
import { UserRepository } from "modules/users/users.repository";

export class DeviceService {
  private deviceRepo = new DeviceRepository();
  private userRepo = new UserRepository();

  async registerDevice(data: {
    venueId?: string;
    userId?: string;
    deviceId: string;
    token: string;
    expoToken: string;
    platform?: string;
    osName?: string;
    osVersion?: string;
    deviceModel?: string;
    buildId?: string;
  }) {
    try {
      if (data.userId) {
        const user = await this.userRepo.findById(data.userId);

        if (!user) {
          return error.error404("User not found");
        }

        const device = await this.deviceRepo.registerDevice({
          token: data.token,
          expoToken: data.expoToken,
          userId: data.userId ?? null,
          venueId: data.venueId ?? null,
          platform: data.platform,
          osName: data.osName,
          osVersion: data.osVersion,
          deviceModel: data.deviceModel,
          deviceId: data.deviceId,
          buildId: data.buildId,
          lastActiveAt: new Date().toISOString(),
        } as any);
        return success.success201("User device registered", device);
      }
    } catch (err) {
      return error.error500("Internal server error" + err);
    }
  }

  async getUserDevices(userId: string) {
    const devices = await this.deviceRepo.findByUserId(userId);
    return {
      status: true,
      message: "Device is founded",
      data: devices,
    };
  }
}
