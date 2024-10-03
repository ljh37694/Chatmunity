'use client'

export default function Backdrop() {

  return (
    <div id="backdrop" onClick={() => {
      const leftPanel: HTMLElement | null = document.querySelector('#left-panel');
      const friendPanel: HTMLElement | null = document.querySelector('#right-panel');
      const backdrop: HTMLElement | null = document.querySelector('#backdrop');

      if (leftPanel?.classList.contains('show-left-panel')) {
        leftPanel?.classList.add('hide-left-panel');
        leftPanel?.classList.remove('show-left-panel');
        backdrop?.classList.remove('show-backdrop');
      }

      if (friendPanel?.classList.contains('show-right-panel')) {
        friendPanel?.classList.add('hide-right-panel');
        friendPanel?.classList.remove('show-right-panel');
      }
    }}></div>
  );
}