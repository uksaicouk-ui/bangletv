import { 
  collection, doc, setDoc, getDoc, getDocs, onSnapshot, 
  query, orderBy, limit, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { JournalistDispatch, Channel } from '../types';

// Collection references
const BREAKING_NEWS_COLLECTION = 'breaking_news';
const DISPATCHES_COLLECTION = 'journalist_dispatches';
const SUBMISSIONS_COLLECTION = 'viewer_submissions';
const CHANNELS_COLLECTION = 'custom_channels';

// 1. Broadcast Breaking News Flash
export async function broadcastBreakingNewsToCloud(text: string, reporter: string): Promise<void> {
  try {
    const docRef = doc(db, BREAKING_NEWS_COLLECTION, 'current_flash');
    await setDoc(docRef, {
      text,
      reporter,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore breaking news sync fallback:', err);
  }
}

// 2. Real-time Listener for Breaking News
export function subscribeBreakingNews(callback: (news: string | null, reporter: string | null) => void) {
  try {
    const docRef = doc(db, BREAKING_NEWS_COLLECTION, 'current_flash');
    return onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        callback(data.text || null, data.reporter || null);
      } else {
        callback(null, null);
      }
    }, (error) => {
      console.warn('Breaking news subscription error:', error);
    });
  } catch {
    return () => {};
  }
}

// 3. Save Journalist Dispatch
export async function saveJournalistDispatchToCloud(dispatch: JournalistDispatch): Promise<void> {
  try {
    const docRef = doc(db, DISPATCHES_COLLECTION, dispatch.id);
    await setDoc(docRef, {
      ...dispatch,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firestore dispatch save fallback:', err);
  }
}

// 4. Real-time Dispatches Listener
export function subscribeJournalistDispatches(callback: (dispatches: JournalistDispatch[]) => void) {
  try {
    const q = query(collection(db, DISPATCHES_COLLECTION), limit(50));
    return onSnapshot(q, (snapshot) => {
      const items: JournalistDispatch[] = [];
      snapshot.forEach((d) => {
        items.push({ id: d.id, ...d.data() } as JournalistDispatch);
      });
      if (items.length > 0) {
        callback(items);
      }
    }, (error) => {
      console.warn('Dispatches subscription error:', error);
    });
  } catch {
    return () => {};
  }
}

// 5. Submit Viewer Feedback / Lead to Cloud
export async function saveViewerSubmissionToCloud(data: any): Promise<void> {
  try {
    const docRef = doc(collection(db, SUBMISSIONS_COLLECTION));
    await setDoc(docRef, {
      ...data,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn('Viewer submission save fallback:', err);
  }
}
