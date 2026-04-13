<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            // Make author_name and author_email nullable for anonymous comments
            $table->string('author_name')->nullable()->change();
            $table->string('author_email')->nullable()->change();
            
            // Add anonymous flag
            $table->boolean('is_anonymous')->default(false)->after('content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->string('author_name')->nullable(false)->change();
            $table->string('author_email')->nullable(false)->change();
            $table->dropColumn('is_anonymous');
        });
    }
};