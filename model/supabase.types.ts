export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4";
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          balance: number;
          created_at: string;
          currency: string;
          id: string;
          is_active: boolean;
          name: string;
          type: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          balance?: number;
          created_at?: string;
          currency?: string;
          id?: string;
          is_active?: boolean;
          name: string;
          type: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          balance?: number;
          created_at?: string;
          currency?: string;
          id?: string;
          is_active?: boolean;
          name?: string;
          type?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      activity_logs: {
        Row: {
          action: string;
          created_at: string;
          id: number;
          metadata: Json | null;
          resource: string | null;
          resource_id: string | null;
          user_id: string | null;
        };
        Insert: {
          action: string;
          created_at?: string;
          id?: number;
          metadata?: Json | null;
          resource?: string | null;
          resource_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          created_at?: string;
          id?: number;
          metadata?: Json | null;
          resource?: string | null;
          resource_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      attachments: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          mime_type: string | null;
          object_key: string;
          size: number | null;
          transaction_id: string | null;
          user_id: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id?: string;
          mime_type?: string | null;
          object_key: string;
          size?: number | null;
          transaction_id?: string | null;
          user_id: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          mime_type?: string | null;
          object_key?: string;
          size?: number | null;
          transaction_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "attachments_transaction_id_fkey";
            columns: ["transaction_id"];
            isOneToOne: false;
            referencedRelation: "transactions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "attachments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      budget_members: {
        Row: {
          budget_id: string;
          joined_at: string;
          role: string;
          user_id: string;
        };
        Insert: {
          budget_id: string;
          joined_at?: string;
          role?: string;
          user_id: string;
        };
        Update: {
          budget_id?: string;
          joined_at?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "budget_members_budget_id_fkey";
            columns: ["budget_id"];
            isOneToOne: false;
            referencedRelation: "budgets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "budget_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      budgets: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          end_date: string | null;
          id: string;
          name: string;
          owner_id: string;
          start_date: string | null;
          updated_at: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency?: string;
          end_date?: string | null;
          id?: string;
          name: string;
          owner_id: string;
          start_date?: string | null;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          end_date?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          start_date?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "budgets_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          color: string | null;
          created_at: string;
          id: string;
          name: string;
          parent_id: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          parent_id?: string | null;
          type: string;
          user_id: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          parent_id?: string | null;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "categories_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          currency: string | null;
          full_name: string | null;
          id: string;
          is_paid: boolean | null;
          stripe_id: string | null;
          timezone: string | null;
          updated_at: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          currency?: string | null;
          full_name?: string | null;
          id: string;
          is_paid?: boolean | null;
          stripe_id?: string | null;
          timezone?: string | null;
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          currency?: string | null;
          full_name?: string | null;
          id?: string;
          is_paid?: boolean | null;
          stripe_id?: string | null;
          timezone?: string | null;
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [];
      };
      recurring_rules: {
        Row: {
          account_id: string | null;
          amount: number;
          category_id: string | null;
          created_at: string;
          currency: string;
          description: string | null;
          id: string;
          interval: string;
          is_active: boolean;
          metadata: Json | null;
          next_date: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          account_id?: string | null;
          amount: number;
          category_id?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          interval: string;
          is_active?: boolean;
          metadata?: Json | null;
          next_date?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          account_id?: string | null;
          amount?: number;
          category_id?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          interval?: string;
          is_active?: boolean;
          metadata?: Json | null;
          next_date?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recurring_rules_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recurring_rules_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recurring_rules_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      transactions: {
        Row: {
          account_id: string | null;
          amount: number;
          category_id: string | null;
          created_at: string;
          currency: string;
          description: string | null;
          id: string;
          is_recurring: boolean;
          metadata: Json | null;
          transaction_date: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          account_id?: string | null;
          amount: number;
          category_id?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          is_recurring?: boolean;
          metadata?: Json | null;
          transaction_date?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          account_id?: string | null;
          amount?: number;
          category_id?: string | null;
          created_at?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          is_recurring?: boolean;
          metadata?: Json | null;
          transaction_date?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey";
            columns: ["account_id"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "transactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_usages: {
        Row: {
          date: string;
          id: string;
          token_count: number | null;
          updated_at: string;
          usage_count: number | null;
        };
        Insert: {
          date: string;
          id?: string;
          token_count?: number | null;
          updated_at?: string;
          usage_count?: number | null;
        };
        Update: {
          date?: string;
          id?: string;
          token_count?: number | null;
          updated_at?: string;
          usage_count?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_token_count: {
        Args: { token_used: number };
        Returns: undefined;
      };
      increment_usage: { Args: { uid: string }; Returns: undefined };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
