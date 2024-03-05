export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Orders: {
        Row: {
          created_at: string;
          id: number;
          orderDetails: Json | null;
          orderStatus: string | null;
          paymentMethod: string | null;
          shippingAddress: string | null;
          totalAmount: number | null;
          user_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          orderDetails?: Json | null;
          orderStatus?: string | null;
          paymentMethod?: string | null;
          shippingAddress?: string | null;
          totalAmount?: number | null;
          user_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          orderDetails?: Json | null;
          orderStatus?: string | null;
          paymentMethod?: string | null;
          shippingAddress?: string | null;
          totalAmount?: number | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "Users";
            referencedColumns: ["id"];
          }
        ];
      };
      ProductImages: {
        Row: {
          created_at: string;
          id: number;
          image_url: string | null;
          product_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
          product_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          image_url?: string | null;
          product_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ProductImages_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "Products";
            referencedColumns: ["id"];
          }
        ];
      };
      Products: {
        Row: {
          average_rating: number;
          category: string;
          color: string;
          created_at: string;
          description: string;
          discount_amount: number;
          id: number;
          name: string;
          brand: string;
          price_per_unit: number;
          size: string;
          stock: number;
        };
        Insert: {
          average_rating?: number;
          category?: string;
          color?: string;
          created_at?: string;
          description?: string;
          discount_amount?: number;
          id?: number;
          name?: string;
          price_per_unit?: number;
          size?: string;
          brand: string;
          stock?: number;
        };
        Update: {
          average_rating?: number;
          category?: string;
          color?: string;
          created_at?: string;
          description?: string;
          discount_amount?: number;
          id?: number;
          name?: string;
          brand: string;
          price_per_unit?: number;
          size?: string;
          stock?: number;
        };
        Relationships: [];
      };
      Users: {
        Row: {
          building_num: string | null;
          city: string | null;
          country: string | null;
          created_at: string;
          id: number;
          profile_picture_url: string | null;
          role: string | null;
          street: string | null;
        };
        Insert: {
          building_num?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          id?: number;
          profile_picture_url?: string | null;
          role?: string | null;
          street?: string | null;
        };
        Update: {
          building_num?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          id?: number;
          profile_picture_url?: string | null;
          role?: string | null;
          street?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
