import { Store } from '@tanstack/react-store'
import { SystemState, } from "@portfolio/types"
import { API_URL } from './api';

// 1. Define the shape of your OS memory


// 2. Initialize the Core Store
export const systemStore = new Store<SystemState>({
  projects: [],
  albums: [],
  testimonials: [],
})
// 3. The Master Fetch (Fires once in the background)
let isFetching = false;

export const fetchSystemData = async () => {
  // 1. PHYSICAL LOCK: If projects already exist in the store,
  // we have already succeeded. NEVER fetch again.
  if (systemStore.state.projects.length > 0) {
    console.log("✅ Data already in store, skipping fetch.");
    return;
  }

  // 2. CONCURRENCY LOCK: If a fetch is currently in progress,
  // don't start a second one.
  if (isFetching) {
    console.log("⏳ Fetch already in progress, ignoring request.");
    return;
  }

  isFetching = true;
  console.log("🚀 Initializing Master Fetch...");

  try {

const data = await fetch(`${API_URL}/profile`).then(res => res.json());

    systemStore.setState((s) => ({ ...s, ...data }));
    console.log("🎉 Store Hydrated Successfully");
  } catch (e) {
    console.error("❌ Fetch failed", e);
  } finally {
    isFetching = false;
  }
}
