import React, { useEffect, useRef } from 'react';
import { getLS } from './Helper';

export default function RecentSearch({
  active,
  setSearchQuery,
  setFormActive,
}) {
  const box = useRef();
  const recent = getLS('recentSearch');
  useEffect(() => {
    const checkOutside = e => {
      if (active && box.current && !box.current.contains(e.target)) {
        setFormActive(false);
      }
    };
    document.addEventListener('mousedown', checkOutside);
    return () => {
      document.removeEventListener('mousedown', checkOutside);
    };
  }, [active, setFormActive]);
  return (
    recent && (
      <div ref={box} className={active ? 'recent active' : 'recent'}>
        <ul>
          {recent.map(location => (
            <li key={location}>
              <button
                type="submit"
                onClick={e => setSearchQuery(e.target.outerText)}>
                {location}
              </button>
            </li>
          ))}
        </ul>
        <div className="clear-recent">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('recentSearch');
              setFormActive(false);
            }}>
            Clear recent
          </button>
        </div>
      </div>
    )
  );
}
