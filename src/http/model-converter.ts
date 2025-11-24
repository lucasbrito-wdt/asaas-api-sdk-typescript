import { AxiosResponse } from "axios";

/**
 * Utility class for converting AxiosResponse to typed objects and vice-versa.
 */
export class ModelConverter {
  /**
   * Converts an AxiosResponse data to a typed object.
   * @param response The AxiosResponse object.
   * @returns The converted typed object.
   */
  static convert<T>(response: AxiosResponse): T {
    // Axios automatically parses JSON, so we just return the data
    return response.data as T;
  }

  /**
   * Serializes a model object to a JSON string.
   * @param model The object to serialize.
   * @returns The JSON string representation of the object.
   */
  static modelToJson(model: any): string {
    return JSON.stringify(model);
  }

  /**
   * Reads the response data as a string.
   * @param response The AxiosResponse object.
   * @returns The response data as a string.
   */
  static readString(response: AxiosResponse): string {
    return String(response.data);
  }

  /**
   * Reads the response data as a Buffer (Node.js specific).
   * @param response The AxiosResponse object.
   * @returns The response data as a Buffer.
   */
  static readBytes(response: AxiosResponse): Buffer {
    // Assuming response.data is already a Buffer or can be converted
    return Buffer.from(response.data);
  }
}

