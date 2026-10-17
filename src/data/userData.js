import useFetch from "../hooks/useFetch";

export default function UserDataProcessor() {
  const { data } = useFetch("/users?limit=10");

  let processedUsers = [];

  if (data) {
    const rawUsers = data.users && Array.isArray(data.users) ? data.users : (Array.isArray(data) ? data : []);

    // Safely transform and inject the mock properties
    processedUsers = rawUsers.map((user) => {
      if (user.id <= 3) return { ...user, role: "admin" };
      if (user.id >= 4 && user.id <= 6) return { ...user, role: "seller" };
      return { ...user, role: "user" };
    });
  }

  return processedUsers;
}
