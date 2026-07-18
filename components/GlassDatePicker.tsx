'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface GlassDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  min?: string;
  placeholder?: string;
  required?: boolean;
}

export function GlassDatePicker({
  value,
  onChange,
  min,
  placeholder = 'Select date',
  required,
}: GlassDatePickerProps) {
  const { t } = useTranslation();
  const DAYS = t.datePicker.days;
  const MONTHS = t.datePicker.months;

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    if (value) return new Date(value).getMonth();
    return new Date().getMonth();
  });
  const [viewYear, setViewYear] = useState(() => {
    if (value) return new Date(value).getFullYear();
    return new Date().getFullYear();
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const minDate = min ? new Date(min) : null;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const selectDate = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(dateStr);
    setOpen(false);
  };

  const isDisabled = (day: number) => {
    if (!minDate) return false;
    const date = new Date(viewYear, viewMonth, day);
    return date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const selected = new Date(value);
    return (
      selected.getDate() === day &&
      selected.getMonth() === viewMonth &&
      selected.getFullYear() === viewYear
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  const formatDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
  };

  const daysInMonth = getDaysInMonth(viewMonth, viewYear);
  const firstDay = getFirstDayOfMonth(viewMonth, viewYear);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger input */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-[#111009] border border-gold/15 text-[13px] px-4 py-3.5 focus:outline-none focus:border-gold/50 transition-colors flex items-center justify-between text-left"
      >
        <span className={value ? 'text-cream' : 'text-cream/15'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <Calendar size={16} className="text-gold/60" />
      </button>

      {/* Hidden native input for form validation */}
      {required && (
        <input
          type="date"
          value={value}
          required
          tabIndex={-1}
          className="absolute inset-0 opacity-0 pointer-events-none"
          onChange={() => {}}
        />
      )}

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 left-0 right-0 sm:left-0 sm:right-auto sm:w-[320px] animate-fade-in-up">
          {/* Glassmorphism container */}
          <div className="backdrop-blur-xl bg-[#1a1508]/85 border border-gold/20 rounded-lg shadow-2xl shadow-black/60 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gold/10">
              <button
                type="button"
                onClick={prevMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gold/10 transition-colors"
              >
                <ChevronLeft size={16} className="text-gold" />
              </button>
              <span className="text-cream text-sm font-medium tracking-wide">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gold/10 transition-colors"
              >
                <ChevronRight size={16} className="text-gold" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 px-3 pt-3 pb-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] tracking-widest uppercase text-gold/50 font-medium py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
              {/* Empty cells for days before the 1st */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const disabled = isDisabled(day);
                const selected = isSelected(day);
                const today = isToday(day);

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabled}
                    onClick={() => selectDate(day)}
                    className={`
                      w-full aspect-square flex items-center justify-center rounded-full text-[13px] sm:text-[13px] transition-all touch-manipulation
                      ${disabled
                        ? 'text-cream/10 cursor-not-allowed'
                        : selected
                          ? 'bg-gold text-dark font-bold shadow-lg shadow-gold/20'
                          : today
                            ? 'border border-gold/40 text-gold hover:bg-gold/15 active:bg-gold/20'
                            : 'text-cream/70 hover:bg-gold/10 hover:text-cream active:bg-gold/15'
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Footer with today shortcut */}
            <div className="border-t border-gold/10 px-4 py-2.5 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  setViewMonth(today.getMonth());
                  setViewYear(today.getFullYear());
                }}
                className="text-[11px] text-gold/60 hover:text-gold tracking-wide uppercase transition-colors"
              >
                {t.datePicker.today}
              </button>
              {value && (
                <button
                  type="button"
                  onClick={() => { onChange(''); setOpen(false); }}
                  className="text-[11px] text-cream/30 hover:text-cream/60 tracking-wide uppercase transition-colors"
                >
                  {t.datePicker.clear}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
