import { supabase } from '../api/supabase';

export const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }
    return data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
