import { useEffect, useState } from 'react';
import axios from '../api/axios_production';

export function useApi<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [url]);

  return { data };
}
