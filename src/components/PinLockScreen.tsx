import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, ShieldAlert, Delete } from "lucide-react";

interface PinLockScreenProps {
  onSuccess: () => void;
}

const AUTHORIZED_PINS = ["0542", "1984", "2026", "7777"];

export default function PinLockScreen({ onSuccess }: PinLockScreenProps) {
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;
      
      if (e.key >= "0" && e.key <= "9") {
        if (pin.length < 4) {
          setError(false);
          setPin((prev) => prev + e.key);
        }
      } else if (e.key === "Backspace") {
        setError(false);
        setPin((prev) => prev.slice(0, -1));
      } else if (e.key === "Escape" || e.key === "Delete") {
        setError(false);
        setPin("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pin, isUnlocked]);

  // Handle pin changes
  useEffect(() => {
    if (pin.length === 4) {
      if (AUTHORIZED_PINS.includes(pin)) {
        setIsUnlocked(true);
        setError(false);
        // Delay callback slightly to allow the animation to play
        const timer = setTimeout(() => {
          onSuccess();
          // Store authentication state in sessionStorage so refreshing doesn't lock them out instantly
          sessionStorage.setItem("app_pin_authenticated", "true");
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        // Trigger shake/error feedback
        setError(true);
        // Play error sound/haptic or just flash, then reset pin
        const timer = setTimeout(() => {
          setPin("");
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [pin, onSuccess]);

  const handleNumClick = (num: number) => {
    if (pin.length < 4 && !isUnlocked) {
      setError(false);
      setPin((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    if (!isUnlocked) {
      setError(false);
      setPin((prev) => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (!isUnlocked) {
      setError(false);
      setPin("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 font-sans text-slate-100 p-4">
      {/* Absolute background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center relative z-10"
      >
        {/* Header Visual Indicator */}
        <div className="mb-6 relative">
          <AnimatePresence mode="wait">
            {isUnlocked ? (
              <motion.div
                key="unlocked"
                initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20"
              >
                <Unlock className="w-8 h-8 text-white" />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                animate={{
                  x: [0, -10, 10, -10, 10, -5, 5, 0],
                  transition: { duration: 0.4 }
                }}
                className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20"
              >
                <ShieldAlert className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="locked"
                className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20"
              >
                <Lock className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isUnlocked ? (
          <h2 className="text-xl font-bold tracking-tight text-white text-center">
            Access Granted
          </h2>
        ) : (
          <div className="flex flex-col items-center select-none mb-2">
            <div className="flex items-center gap-1.5 mb-2 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-indigo-400 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
              SECURE DEPLOYMENT
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-indigo-600 text-white rounded-md shadow-xs shadow-indigo-500/30 tracking-tight">
                ai
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                machete
              </span>
            </div>
            <div className="text-[9px] font-mono font-bold tracking-[0.3em] text-indigo-400/80 uppercase mt-1.5">
              HTML CODE SPACE
            </div>
          </div>
        )}
        <p className="text-xs text-slate-400 mt-1.5 text-center max-w-xs">
          {isUnlocked
            ? "Unlocking Workspace. Preparing email editor..."
            : "This workspace is locked. Enter your 4-digit PIN to continue."}
        </p>

        {/* Passcode dots display */}
        <div className="my-8 flex justify-center gap-4">
          {[0, 1, 2, 3].map((index) => {
            const hasValue = pin.length > index;
            return (
              <div key={index} className="relative w-4 h-4">
                <div
                  className={`absolute inset-0 rounded-full border-2 transition-all duration-250 ${
                    error
                      ? "border-red-500 bg-red-500/30 scale-110"
                      : isUnlocked
                      ? "border-emerald-500 bg-emerald-500"
                      : hasValue
                      ? "border-indigo-500 bg-indigo-500"
                      : "border-slate-700 bg-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold text-red-400 -mt-4 mb-4"
          >
            Incorrect PIN. Please try again.
          </motion.p>
        )}

        {/* Numeric Keypad Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumClick(num)}
              disabled={isUnlocked}
              className="h-14 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-lg font-bold text-slate-100 transition-all border border-slate-800/50 flex items-center justify-center disabled:opacity-40"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            disabled={isUnlocked}
            className="h-14 rounded-full text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center justify-center uppercase tracking-wider active:scale-95 disabled:opacity-40"
          >
            Clear
          </button>
          <button
            onClick={() => handleNumClick(0)}
            disabled={isUnlocked}
            className="h-14 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-lg font-bold text-slate-100 transition-all border border-slate-800/50 flex items-center justify-center disabled:opacity-40"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            disabled={isUnlocked}
            className="h-14 rounded-full text-slate-400 hover:text-white transition-all flex items-center justify-center active:scale-95 disabled:opacity-40"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
