import { IconProps } from "./components/Icon";

export type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

export type Position =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';



  export type Theme = 'light' | 'dark' | 'colored' | (string & {});

  export type ToastIcon =
  | false
  | ((props: IconProps) => React.ReactNode)
  | React.ReactElement<IconProps>;

export type ToastClassName =
  | ((context?: {
      type?: TypeOptions;
      defaultClassName?: string;
      position?: Position;
      rtl?: boolean;
    }) => string)
  | string;

export interface ClearWaitingQueueParams {
  containerId?: Id;
}

interface CommonOptions {
    /**
     * Pause the timer when the mouse hover the toast.
     * `Default: true`
     */
    pauseOnHover?: boolean;
  
    /**
     * Pause the toast when the window loses focus.
     * `Default: true`
     */
    pauseOnFocusLoss?: boolean;
  
    /**
     * Remove the toast when clicked.
     * `Default: false`
     */
    closeOnClick?: boolean;
  
    /**
     * Set the delay in ms to close the toast automatically.
     * Use `false` to prevent the toast from closing.
     * `Default: 5000`
     */
    autoClose?: number | false;
  
    /**
     * Set the default position to use.
     * `One of: 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'`
     * `Default: 'top-right'`
     */
    position?: ToastPosition;
  
    /**
     * Pass a custom close button.
     * To remove the close button pass `false`
     */
    closeButton?:
      | boolean
      | ((props: CloseButtonProps) => React.ReactNode)
      | React.ReactElement<CloseButtonProps>;
  
    /**
     * An optional css class to set for the progress bar.
     */
    progressClassName?: ToastClassName;
  
    /**
     * An optional style to set for the progress bar.
     */
    progressStyle?: React.CSSProperties;
  
    /**
     * An optional css class to set for the toast content.
     */
    bodyClassName?: ToastClassName;
  
    /**
     * An optional inline style to apply for the toast content.
     */
    bodyStyle?: React.CSSProperties;
  
    /**
     * Hide or show the progress bar.
     * `Default: false`
     */
    hideProgressBar?: boolean;
  
    /**
     * Pass a custom transition see https://fkhadra.github.io/react-toastify/custom-animation/
     */
    transition?: ToastTransition;
  
    /**
     * Allow toast to be draggable
     * `Default: 'touch'`
     */
    draggable?: boolean | 'mouse' | 'touch';
  
    /**
     * The percentage of the toast's width it takes for a drag to dismiss a toast
     * `Default: 80`
     */
    draggablePercent?: number;
  
    /**
     * Specify in which direction should you swipe to dismiss the toast
     * `Default: "x"`
     */
  
    draggableDirection?: DraggableDirection;
  
    /**
     * Define the ARIA role for the toast
     * `Default: alert`
     *  https://www.w3.org/WAI/PF/aria/roles
     */
    role?: string;
  
    /**
     * Set id to handle multiple container
     */
    containerId?: Id;
  
    /**
     * Fired when clicking inside toaster
     */
    onClick?: (event: React.MouseEvent) => void;
  
    /**
     * Support right to left display.
     * `Default: false`
     */
    rtl?: boolean;
  
    /**
     * Used to display a custom icon. Set it to `false` to prevent
     * the icons from being displayed
     */
    icon?: ToastIcon;
  
    /**
     * Theme to use.
     * `One of: 'light', 'dark', 'colored'`
     * `Default: 'light'`
     */
    theme?: Theme;
  }

export type Id = number | string;

export interface ToastOptions<Data = unknown> extends CommonOptions {
    /**
     * An optional css class to set.
     */
    className?: ToastClassName;
  
    /**
     * Called when toast is mounted.
     */
    onOpen?: <T = {}>(props: T) => void;
  
    /**
     * Called when toast is unmounted.
     */
    onClose?: <T = {}>(props: T) => void;
  
    /**
     * An optional inline style to apply.
     */
    style?: React.CSSProperties;
  
    /**
     * Set the toast type.
     * `One of: 'info', 'success', 'warning', 'error', 'default'`
     */
    type?: TypeOptions;
  
    /**
     * Set a custom `toastId`
     */
    toastId?: Id;
  
    /**
     * Used during update
     */
    updateId?: Id;
  
    /**
     * Set the percentage for the controlled progress bar. `Value must be between 0 and 1.`
     */
    progress?: number | string;
  
    /**
     * Add a delay in ms before the toast appear.
     */
    delay?: number;
  
    isLoading?: boolean;
  
    data?: Data;
  }




export interface ToastProps extends ToastOptions {
    isIn: boolean;
    staleId?: Id;
    toastId: Id;
    key: Id;
    transition: ToastTransition;
    closeToast: () => void;
    position: Position;
    children?: ToastContent;
    draggablePercent: number;
    draggableDirection?: DraggableDirection;
    progressClassName?: ToastClassName;
    className?: ToastClassName;
    bodyClassName?: ToastClassName;
    deleteToast: () => void;
    theme: Theme;
    type: TypeOptions;
    collapseAll: () => void;
    stacked?: boolean;
  }