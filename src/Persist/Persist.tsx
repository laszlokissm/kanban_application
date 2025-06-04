const LOCAL_STORAGE_KEY = "kanban_data";

export const saveToLocalStorage = (data: unknown) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const loadFromLocalStorage = <T,>(defaultValue: T): T => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (storedData) {
        return JSON.parse(storedData, (key, value) => {
          if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
            return new Date(value);
          }
          return value;
        }) as T;
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }

    return defaultValue;
};
