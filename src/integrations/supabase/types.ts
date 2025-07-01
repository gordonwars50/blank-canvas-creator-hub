export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cameras: {
        Row: {
          created_at: string | null
          id: string
          name: string
          notes: string | null
          serial_number: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
          serial_number?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
          serial_number?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lenses: {
        Row: {
          aperture: string | null
          created_at: string | null
          focal_length: string | null
          id: string
          name: string
          notes: string | null
          user_id: string
        }
        Insert: {
          aperture?: string | null
          created_at?: string | null
          focal_length?: string | null
          id?: string
          name: string
          notes?: string | null
          user_id: string
        }
        Update: {
          aperture?: string | null
          created_at?: string | null
          focal_length?: string | null
          id?: string
          name?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          location: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          id: string
          ideas: string | null
          metadata: Json | null
          scheduled_date: string | null
          scheduled_time: string | null
          script: string | null
          selected_mode: string | null
          state: string
          title: string
          updated_at: string | null
          upload_now: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          ideas?: string | null
          metadata?: Json | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          script?: string | null
          selected_mode?: string | null
          state?: string
          title: string
          updated_at?: string | null
          upload_now?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          ideas?: string | null
          metadata?: Json | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          script?: string | null
          selected_mode?: string | null
          state?: string
          title?: string
          updated_at?: string | null
          upload_now?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      scenes: {
        Row: {
          created_at: string | null
          id: string
          name: string
          notes: string | null
          project_id: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
          project_id: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
          project_id?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scenes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      shots: {
        Row: {
          camera_id: string | null
          created_at: string | null
          id: string
          lens_id: string | null
          name: string
          scene_id: string
          updated_at: string | null
        }
        Insert: {
          camera_id?: string | null
          created_at?: string | null
          id?: string
          lens_id?: string | null
          name: string
          scene_id: string
          updated_at?: string | null
        }
        Update: {
          camera_id?: string | null
          created_at?: string | null
          id?: string
          lens_id?: string | null
          name?: string
          scene_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shots_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes"
            referencedColumns: ["id"]
          },
        ]
      }
      storyboard_files: {
        Row: {
          created_at: string | null
          file_path: string
          id: string
          name: string
          project_id: string
          size: number | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          id?: string
          name: string
          project_id: string
          size?: number | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          id?: string
          name?: string
          project_id?: string
          size?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storyboard_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_assignments: {
        Row: {
          created_at: string | null
          email: string
          id: string
          project_id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          project_id: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          project_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invites: {
        Row: {
          email: string
          id: string
          invited_at: string | null
          invited_by: string
          role: string
          status: string | null
        }
        Insert: {
          email: string
          id?: string
          invited_at?: string | null
          invited_by: string
          role: string
          status?: string | null
        }
        Update: {
          email?: string
          id?: string
          invited_at?: string | null
          invited_by?: string
          role?: string
          status?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar: string | null
          email: string
          id: string
          is_active: boolean | null
          joined_at: string | null
          name: string
          role: string
          user_id: string
        }
        Insert: {
          avatar?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          name: string
          role: string
          user_id: string
        }
        Update: {
          avatar?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          joined_at?: string | null
          name?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
